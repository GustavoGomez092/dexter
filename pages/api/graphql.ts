import "reflect-metadata";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import server from "@/backend/server";

export default startServerAndCreateNextHandler<NextRequest>(server);
