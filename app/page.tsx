'use client'

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './dashboard/page'  // ← MUDEI AQUI
import ActionView from './components/ActionView'
import AlertToast from './components/AlertToast'

export interface Alert {
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

  const [stats] = useState({
    totalOrders: 1247,
    inTransit: 89,
    delivered: 1142,
    issues: 16
  })

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
      <Navbar alerts={alerts.filter(a => a.status === 'pending')} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' ? (
          <Dashboard
            alerts={alerts}
            stats={stats}
            onViewAlert={handleViewAlert}
          />
        ) : (
          <ActionView
            alert={selectedAlert}
            onBack={() => setCurrentView('dashboard')}
            onResolve={() => selectedAlert && handleAlertAction(selectedAlert.id, 'resolved')}
            onCancel={() => selectedAlert && handleAlertAction(selectedAlert.id, 'cancelled')}
          />
        )}
      </main>

      {showAlert && (
        <AlertToast
          alert={alerts[0]}
          onTreat={() => handleViewAlert(alerts[0])}
          onDismiss={() => setShowAlert(false)}
        />
      )}
    </div>
  )
}