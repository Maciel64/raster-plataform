import { MicrocontrollerTable } from "@/components/microcontroller/microcontroller-table";
import { Skeleton } from "@/components/ui/skeleton";
import { getMicrocontrollerService } from "@/domain/microcontrollers/microcontroller.hooks";

import { Cpu } from "lucide-react";
import { Suspense } from "react";

import * as motion from "motion/react-client";
import { container, item } from "@/lib/motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MicrocontrollersPage() {
  const microcontrollersPromise = getMicrocontrollerService().findMany();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Microcontroladores
        </span>
      </h1>
      <p className="mt-2 text-muted-foreground pb-4">
        Gerencie todos os microcontroladores
      </p>

      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5" /> Lista de microcontroladores
              </CardTitle>
              <CardDescription>Microcontroladores cadastrados</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                <MicrocontrollerTable
                  microcontrollersPromise={microcontrollersPromise}
                />
              </Suspense>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
