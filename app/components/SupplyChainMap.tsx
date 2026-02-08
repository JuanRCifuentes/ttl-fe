"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { SupplyChainStage } from "../hooks/useSupplyChain";

function numberedIcon(n: number, selected: boolean) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:28px;height:28px;border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:12px;font-weight:700;color:#fff;
      background:${selected ? "#2563eb" : "#404040"};
      border:2px solid ${selected ? "#93bbfd" : "#a3a3a3"};
      box-shadow:0 2px 6px rgba(0,0,0,.3);
    ">${n}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function FlyTo({
  position,
}: {
  position: [number, number] | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 10, { duration: 1 });
    }
  }, [map, position]);
  return null;
}

export default function SupplyChainMap({
  stages,
  selectedStageId,
  onStageSelect,
}: {
  stages: SupplyChainStage[];
  selectedStageId: number | null;
  onStageSelect: (id: number) => void;
}) {
  const mapRef = useRef<L.Map | null>(null);

  const selectedStage = stages.find((s) => s.id === selectedStageId);
  const flyTarget = selectedStage?.position ?? null;

  // Compute bounds to fit all stages
  const bounds =
    stages.length > 0
      ? L.latLngBounds(stages.map((s) => s.position))
      : undefined;

  return (
    <MapContainer
      ref={mapRef}
      bounds={bounds}
      boundsOptions={{ padding: [40, 40] }}
      scrollWheelZoom
      className="h-full w-full rounded-2xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyTo position={flyTarget} />
      {stages.map((stage) => (
        <Marker
          key={stage.id}
          position={stage.position}
          icon={numberedIcon(stage.id, stage.id === selectedStageId)}
          eventHandlers={{
            click: () => onStageSelect(stage.id),
          }}
        >
          <Popup>
            <strong>{stage.id}. {stage.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
