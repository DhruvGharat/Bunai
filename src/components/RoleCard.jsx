import { Link } from 'react-router-dom'

const RoleCard = ({ role, icon, title, description, onClick }) => {
  const roleColors = {
    admin: 'maroon',
    buyer: 'mustard',
    artisan: 'forest-green',
    volunteer: 'neutral-dark'
  }

  return (
    <Link
      to={`/login/${role}`}
      onClick={onClick}
      className={`
        group relative flex flex-col items-center justify-center
        p-6 rounded-xl border-2 border-transparent
        transition-all duration-300
        hover:border-${roleColors[role]} hover:shadow-lg
        hover:-translate-y-1
      `}
    >
      <div className={`
        w-16 h-16 rounded-full flex items-center justify-center
        bg-${roleColors[role]} text-white mb-4
      `}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-center text-neutral-dark/70 mb-4">{description}</p>
      <button className={`
        px-6 py-2 rounded-xl text-white font-medium
        bg-${roleColors[role]} hover:bg-opacity-90
        transition-all duration-200
      `}>
        Continue as {title}
      </button>
    </Link>
  )
}

export default RoleCard
