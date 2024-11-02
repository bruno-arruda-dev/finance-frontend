'use client'
import { HealthService } from "@/services/health-service";
import { useEffect } from "react";

export default function Home() {
  async function fetchHealth() {
    const res = await HealthService.get()
    console.log(res)
  }

  useEffect(() => {
    fetchHealth()
  }, [])

  return <div className="">Finance</div>
}