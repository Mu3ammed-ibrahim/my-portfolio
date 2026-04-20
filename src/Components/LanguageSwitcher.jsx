import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function LanguageSwitcher({ className = '' }) {
  const { i18n } = useTranslation()
  const isAr = i18n.language === 'ar'

  const toggle = () => i18n.changeLanguage(isAr ? 'en' : 'ar')

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 border border-brand-cta/30 text-brand-cta hover:bg-brand-cta/10 rounded-lg transition-colors cursor-pointer ${className}`}
      aria-label={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <span className="font-bold">{isAr ? 'EN' : 'ع'}</span>
    </motion.button>
  )
}
