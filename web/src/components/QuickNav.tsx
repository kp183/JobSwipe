import Link from 'next/link';

export default function QuickNav() {
  const pages = [
    { name: 'Discover', href: '/', emoji: '🏠' },
    { name: 'Search', href: '/search', emoji: '🔍' },
    { name: 'App Pulse', href: '/application-pulse', emoji: '📡' },
    { name: 'ATS Check', href: '/ats-optimizer', emoji: '🤖' },
    { name: 'Profile', href: '/profile', emoji: '👤' },
    { name: 'Integrations', href: '/integrations', emoji: '🔗' },
    { name: 'Skill Gap', href: '/skill-gap-analysis', emoji: '🎯' },
    { name: 'Settings', href: '/settings', emoji: '⚙️' }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 lg:hidden">
      <div className="bg-white rounded-lg shadow-lg border p-2">
        <div className="text-xs text-gray-500 mb-2 text-center">Quick Nav</div>
        <div className="grid grid-cols-4 gap-1">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="flex flex-col items-center p-2 rounded hover:bg-gray-100 transition-colors"
              title={page.name}
            >
              <span className="text-lg">{page.emoji}</span>
              <span className="text-xs text-gray-600">{page.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}