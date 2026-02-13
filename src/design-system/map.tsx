import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type MapContextValue = {
  map: MapLibreGL.Map | null;
};

const MapContext = createContext<MapContextValue | null>(null);

function useMap() {
  const context = useContext(MapContext);
  if (!context) throw new Error("useMap must be used within a Map component");
  return context;
}

interface MapProps {
  children?: ReactNode;
  center: [number, number];
  zoom?: number;
  interactive?: boolean;
}

export function Map({ children, center, zoom = 13, interactive = false }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<MapLibreGL.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new MapLibreGL.Map({
      container: containerRef.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center,
      zoom,
      interactive,
      renderWorldCopies: false,
      attributionControl: false,
    });

    map.on("load", () => setMapInstance(map));

    return () => {
      map.remove();
      setMapInstance(null);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const contextValue = useMemo(() => ({ map: mapInstance }), [mapInstance]);

  return (
    <MapContext.Provider value={contextValue}>
      <div ref={containerRef} className="relative w-full h-full">
        {mapInstance && children}
      </div>
    </MapContext.Provider>
  );
}

interface MapMarkerProps {
  longitude: number;
  latitude: number;
  children: ReactNode;
}

export function MapMarker({ longitude, latitude, children }: MapMarkerProps) {
  const { map } = useMap();

  const marker = useMemo(() => {
    return new MapLibreGL.Marker({
      element: document.createElement("div"),
    }).setLngLat([longitude, latitude]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!map) return;
    marker.addTo(map);
    return () => { marker.remove(); };
  }, [map, marker]);

  if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) {
    marker.setLngLat([longitude, latitude]);
  }

  return createPortal(children, marker.getElement());
}
