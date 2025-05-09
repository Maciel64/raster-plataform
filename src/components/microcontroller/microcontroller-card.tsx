"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Cpu,
  Wifi,
  Car,
  Bike,
  Truck,
  Tag,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MicrocontrollerModal } from "./microcontroller-modal";
import type { Microcontroller } from "@/@types/microcontroller";

interface MicrocontrollerCardProps {
  microcontroller: Microcontroller;
  map: React.ReactNode;
}

export function MicrocontrollerCard({
  microcontroller,
  map,
}: MicrocontrollerCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Determinar a cor do chip
  const getChipColor = (chip: string) => {
    switch (chip) {
      case "VIVO":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "CLARO":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "TIM":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Determinar o ícone do tipo de veículo
  const getVehicleIcon = () => {
    switch (microcontroller.type) {
      case "CAR":
        return <Car className="h-4 w-4 mr-1" />;
      case "BIKE":
        return <Bike className="h-4 w-4 mr-1" />;
      case "TRUCK":
        return <Truck className="h-4 w-4 mr-1" />;
      default:
        return <Car className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
        className="h-full"
      >
        <Card className="h-full flex flex-col overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-bold truncate">
                {microcontroller.name}
              </CardTitle>
              <Badge
                variant={microcontroller.active ? "default" : "destructive"}
                className="ml-2"
              >
                {microcontroller.active ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 mr-1" />
                )}
                {microcontroller.active ? "Ativo" : "Inativo"}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="flex items-center">
                <Cpu className="h-3 w-3 mr-1" />
                {microcontroller.model}
              </Badge>
              <Badge
                variant="outline"
                className={`flex items-center ${getChipColor(
                  microcontroller.chip
                )}`}
              >
                <Wifi className="h-3 w-3 mr-1" />
                {microcontroller.chip}
              </Badge>
              <Badge variant="outline" className="flex items-center">
                {getVehicleIcon()}
                {microcontroller.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-0">
            <div className="h-[200px] w-full overflow-hidden">{map}</div>
          </CardContent>
          <CardFooter className="flex flex-col items-start pt-4 pb-4">
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Tag className="h-4 w-4 mr-1" />
              <span className="font-medium">Placa:</span>{" "}
              {microcontroller.plate}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="font-medium">Coordenadas:</span>{" "}
              {microcontroller.coordinates &&
              microcontroller.coordinates.length > 0
                ? `${microcontroller.coordinates[0].latitude.toFixed(
                    6
                  )}, ${microcontroller.coordinates[0].longitude.toFixed(6)}`
                : "Não disponível"}
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full"
              variant="default"
            >
              Visualizar
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <MicrocontrollerModal
        map={map}
        microcontroller={microcontroller}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
