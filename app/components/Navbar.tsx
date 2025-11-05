'use client'

import { Bell, Truck } from 'lucide-react'
import { Alert } from '../page'

interface NavbarProps {
  alerts: Alert[]
}

export default function Navbar({ alerts }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md border-b-4 border-[#950606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="bg-[#950606] p-3 rounded-lg mr-4 shadow-lg">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">LogiControl</h1>
              <p className="text-sm text-gray-500">Supervisor Carlos</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Última atualização</p>
              <p className="text-sm font-semibold text-gray-800">Agora há pouco</p>
            </div>
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-[#950606] transition-colors" />
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#950606] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {alerts.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}