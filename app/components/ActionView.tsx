'use client'

import { ArrowRight, CheckCircle, XCircle, Box, Truck, MapPin, Clock } from 'lucide-react'
import { Alert } from '../page'
import { useState } from 'react'

interface ActionViewProps {
  alert: Alert | null
  onBack: () => void
  onResolve: () => void
  onCancel: () => void
}

export default function ActionView({ alert, onBack, onResolve, onCancel }: ActionViewProps) {
  const [notes, setNotes] = useState('')

  if (!alert) return null

  return (
    <div className="space-y-6 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
      <button
        onClick={onBack}
        className="text-gray-600 hover:text-gray-800 flex items-center transition-colors"
      >
        <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
        Voltar ao Dashboard
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Resolver Alerta</h2>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
            alert.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            Prioridade {alert.severity === 'high' ? 'Alta' : 'Média'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Local</p>
              <p className="text-lg font-semibold text-gray-800">{alert.location}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Produto/Carga</p>
              <p className="text-lg font-semibold text-gray-800">{alert.product}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Tipo de Problema</p>
              <p className="text-lg font-semibold text-gray-800">
                {alert.type === 'ruptura' ? 'Ruptura de Estoque' : 'Atraso na Entrega'}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Detectado há</p>
              <p className="text-lg font-semibold text-gray-800">{alert.time}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Ações Recomendadas</h3>
          <div className="space-y-3">
            {alert.type === 'ruptura' ? (
              <>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                  <div className="flex items-start">
                    <Box className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Transferir estoque de CD alternativo</p>
                      <p className="text-sm text-gray-600 mt-1">CD Guarulhos tem 450 unidades disponíveis • Chegada em 4h</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                  <div className="flex items-start">
                    <Truck className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Acionar fornecedor para entrega emergencial</p>
                      <p className="text-sm text-gray-600 mt-1">Fornecedor XYZ pode entregar em 24h • Custo adicional: R$ 1.200</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Redirecionar para rota alternativa</p>
                      <p className="text-sm text-gray-600 mt-1">Evitar tráfego na Marginal • Economia de 30min</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Notificar cliente sobre novo prazo</p>
                      <p className="text-sm text-gray-600 mt-1">Novo prazo estimado: 45min de atraso</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Observações</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#950606] focus:border-transparent transition-all"
            rows={4}
            placeholder="Adicione observações sobre a resolução do problema..."
          ></textarea>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onResolve}
            className="flex-1 bg-[#950606] text-white py-4 rounded-lg font-semibold hover:bg-[#c40808] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Marcar como Resolvido
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-4 rounded-lg font-semibold hover:bg-gray-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Cancelar Alerta
          </button>
        </div>
      </div>
    </div>
  )
}
