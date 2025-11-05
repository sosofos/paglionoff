'use client'

import { useState, useEffect } from 'react'
import { Bell, Package, TrendingUp, Clock, CheckCircle, AlertTriangle, MapPin, Truck, ArrowRight, Box, XCircle } from 'lucide-react'

interface Alert {
  id: number
  type: 'ruptura' | 'atraso'
  severity: 'high' | 'medium'
  location: string
  product: string
  quantity?: number
  delay?: string
  time: string
  status: 'pending' | 'resolved' | 'cancelled'
}

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'action'>('dashboard')
  const [showAlert, setShowAlert] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'ruptura',
      severity: 'high',
      location: 'CD São Paulo',
      product: 'Produto A',
      quantity: 0,
      time: '2 min atrás',
      status: 'pending'
    },
    {
      id: 2,
      type: 'atraso',
      severity: 'medium',
      location: 'Rota 045',
      product: 'Carga #3421',
      delay: '45min',
      time: '15 min atrás',
      status: 'pending'
    },
  ])

  const stats = {
    totalOrders: 1247,
    inTransit: 89,
    delivered: 1142,
    issues: 16
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleAlertAction = (alertId: number, action: 'resolved' | 'cancelled') => {
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, status: action } : a))
    setShowAlert(false)
    setCurrentView('dashboard')
  }

  const handleViewAlert = (alert: Alert) => {
    setSelectedAlert(alert)
    setCurrentView('action')
    setShowAlert(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
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
                {alerts.filter(a => a.status === 'pending').length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#950606] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {alerts.filter(a => a.status === 'pending').length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' ? (
          /* DASHBOARD */
          <div className="space-y-6">
            {/* Cards de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#950606] transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total de Pedidos</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalOrders}</p>
                  </div>
                  <Package className="text-[#950606] w-12 h-12 opacity-80" />
                </div>
                <div className="mt-4 flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+12% vs ontem</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Em Trânsito</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.inTransit}</p>
                  </div>
                  <Truck className="text-blue-500 w-12 h-12 opacity-80" />
                </div>
                <div className="mt-4 flex items-center text-blue-600 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Média: 2h 15min</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Entregues Hoje</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.delivered}</p>
                  </div>
                  <CheckCircle className="text-green-500 w-12 h-12 opacity-80" />
                </div>
                <div className="mt-4 flex items-center text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>97.8% no prazo</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Problemas Ativos</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.issues}</p>
                  </div>
                  <AlertTriangle className="text-orange-500 w-12 h-12 opacity-80" />
                </div>
                <div className="mt-4 flex items-center text-orange-600 text-sm">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  <span>2 críticos</span>
                </div>
              </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-[#950606]" />
                  Desempenho por Período
                </h3>
                <div className="space-y-3">
                  {[
                    { period: 'Manhã (6h-12h)', value: 87 },
                    { period: 'Tarde (12h-18h)', value: 94 },
                    { period: 'Noite (18h-24h)', value: 78 }
                  ].map(item => (
                    <div key={item.period}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{item.period}</span>
                        <span className="font-semibold text-gray-800">{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#950606] to-[#c40808] h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-[#950606]" />
                  Status por Região
                </h3>
                <div className="space-y-4">
                  {[
                    { region: 'São Paulo', status: 'Operacional', color: 'green' },
                    { region: 'Rio de Janeiro', status: 'Operacional', color: 'green' },
                    { region: 'Minas Gerais', status: 'Atenção', color: 'orange' },
                    { region: 'Bahia', status: 'Operacional', color: 'green' }
                  ].map(item => (
                    <div key={item.region} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <span className="font-medium text-gray-700">{item.region}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.color === 'green' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabela de Alertas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-[#950606]" />
                Alertas Recentes
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Tipo</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Local</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Descrição</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Horário</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Status</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alerts.map(alert => (
                      <tr key={alert.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            alert.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {alert.type === 'ruptura' ? 'Ruptura' : 'Atraso'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{alert.location}</td>
                        <td className="py-4 px-4 text-gray-700">{alert.product}</td>
                        <td className="py-4 px-4 text-gray-500 text-sm">{alert.time}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            alert.status === 'pending' ? 'bg-orange-100 text-orange-700' : 
                            alert.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {alert.status === 'pending' ? 'Pendente' : alert.status === 'resolved' ? 'Resolvido' : 'Cancelado'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleViewAlert(alert)}
                            className="text-[#950606] hover:text-[#c40808] font-semibold text-sm flex items-center transition-colors"
                          >
                            Tratar
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* ACTION VIEW */
          <div className="space-y-6">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-gray-600 hover:text-gray-800 flex items-center transition-colors"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Voltar ao Dashboard
            </button>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Resolver Alerta</h2>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  selectedAlert?.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  Prioridade {selectedAlert?.severity === 'high' ? 'Alta' : 'Média'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Local</p>
                    <p className="text-lg font-semibold text-gray-800">{selectedAlert?.location}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Produto/Carga</p>
                    <p className="text-lg font-semibold text-gray-800">{selectedAlert?.product}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Tipo de Problema</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedAlert?.type === 'ruptura' ? 'Ruptura de Estoque' : 'Atraso na Entrega'}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Detectado há</p>
                    <p className="text-lg font-semibold text-gray-800">{selectedAlert?.time}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Ações Recomendadas</h3>
                <div className="space-y-3">
                  {selectedAlert?.type === 'ruptura' ? (
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
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#950606] focus:border-transparent transition-all"
                  rows={4}
                  placeholder="Adicione observações sobre a resolução do problema..."
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => selectedAlert && handleAlertAction(selectedAlert.id, 'resolved')}
                  className="flex-1 bg-[#950606] text-white py-4 rounded-lg font-semibold hover:bg-[#c40808] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Marcar como Resolvido
                </button>
                <button
                  onClick={() => selectedAlert && handleAlertAction(selectedAlert.id, 'cancelled')}
                  className="flex-1 bg-gray-500 text-white py-4 rounded-lg font-semibold hover:bg-gray-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Cancelar Alerta
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Toast de Alerta */}
      {showAlert && (
        <div className="fixed top-24 right-8 bg-white rounded-xl shadow-2xl border-l-4 border-[#950606] p-6 max-w-md z-50">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="bg-[#950606] p-3 rounded-full animate-pulse">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">⚠️ Alerta Crítico</h3>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Ruptura de estoque</strong> detectada em CD São Paulo para Produto A
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleViewAlert(alerts[0])
                  }}
                  className="bg-[#950606] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#c40808] transition-all transform hover:scale-105"
                >
                  Tratar Agora
                </button>
                <button
                  onClick={() => setShowAlert(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-all"
                >
                  Depois
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}