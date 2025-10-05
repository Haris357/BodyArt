'use client';

interface StatsSectionProps {
  data?: {
    title?: string;
    backgroundImage?: string;
    stats?: Array<{
      number: string;
      label: string;
      suffix?: string;
    }>;
  };
}

export default function StatsSection({ data }: StatsSectionProps) {
  if (!data || !data.stats || data.stats.length === 0) {
    return null;
  }

  const content = data;

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${content.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
          {content.title}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {content.stats.map((stat, index) => (
            <div key={index} className="stats-item group text-center">
              <div className="text-5xl md:text-6xl font-bold theme-text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-white font-medium text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}