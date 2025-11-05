'use client'

import { AlertTriangle } from 'lucide-react'
import { Alert } from '../page'

interface AlertToastProps {
  alert: Alert
  onTreat: () => void
  onDismiss: () => void
}

export default function AlertToast({ alert, onTreat, onDismiss }: AlertToastProps) {
  return (
    <div className="fixed top-24 right-8 bg-white rounded-xl shadow-2xl border-l-4 border-[#950606] p-6 max-w-md z-50 opacity-0 animate-[slideIn_0.4s_ease-out_forwards]">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="bg-[#950606] p-3 rounded-full animate-pulse">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-1">⚠️ Alerta Crítico</h3>
          <p className="text-sm text-gray-600 mb-3">
            <strong>{alert.type === 'ruptura' ? 'Ruptura de estoque' : 'Atraso'}</strong> detectada em {alert.location} para {alert.product}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onTreat}
              className="bg-[#950606] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#c40808] transition-all transform hover:scale-105"
            >
              Tratar Agora
            </button>
            <button
              onClick={onDismiss}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-all"
            >
              Depois
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}