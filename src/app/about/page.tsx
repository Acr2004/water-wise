"use client";

import { useTranslation } from 'react-i18next';
import { useTranslatedPageTitle } from '@/hooks/useTranslatedPageTitle';
import Image from "next/image";
import { 
  Code2, 
  Database, 
  Globe, 
  Map, 
  Smartphone, 
  Monitor, 
  Gauge,  
  Zap, 
  Users, 
  GitBranch,
  BarChart3,
  Languages,
  Eye,
  Wifi,
  Bot,
  Webhook
} from 'lucide-react';

export default function AboutPage() {
  const { t } = useTranslation();
  useTranslatedPageTitle('title.about');

  const techStackIcons = {
    frontend: <Code2 className="w-8 h-8 text-primary" />,
    backend: <Webhook className="w-8 h-8 text-primary" />,
    database: <Database className="w-8 h-8 text-primary" />,
    maps: <Map className="w-8 h-8 text-primary" />,
    tools: <Monitor className="w-8 h-8 text-primary" />,
    ai: <Bot className="w-8 h-8 text-primary" />
  };

  const featureIcons = {
    realtime: <Zap className="w-6 h-6 text-primary" />,
    visualization: <BarChart3 className="w-6 h-6 text-primary" />,
    multilingual: <Languages className="w-6 h-6 text-primary" />,
    responsive: <Smartphone className="w-6 h-6 text-primary" />,
    offline: <Wifi className="w-6 h-6 text-primary" />,
    predictions: <Eye className="w-6 h-6 text-primary" />
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section with Glass */}
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Text Content */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-primary mb-6">{t('about.subtitle')}</h1>
              <p className="text-lg text-gray600 dark:text-gray400 mb-6 leading-relaxed lg:text-xl">
                {t('about.description')}
              </p>
            </div>
            
            {/* University Logo */}
            <div className="flex-shrink-0 flex justify-center lg:justify-end">
              <div className="glass-card w-32 h-32 flex items-center justify-center">
                <Image src="/ul.png" alt="Universidade Lusófona" className="w-28 h-28 object-contain" width={112} height={112} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-gray700 dark:text-gray300 mb-6 flex items-center gap-3">
          <Globe className="w-6 h-6 text-primary" />
          {t('about.mission.title')}
        </h2>
        <p className="text-lg text-gray600 dark:text-gray400 leading-relaxed lg:text-xl">
          {t('about.mission.description')}
        </p>
      </div>

      {/* Team */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-gray700 dark:text-gray300 mb-8 flex items-center gap-3">
          <Users className="w-6 h-6 text-primary" />
          {t('about.team.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-gray700 dark:text-gray300 mb-4">{t('about.team.developers')}</h3>
            <ul className="space-y-3 text-gray600 dark:text-gray400">
              <li className="flex items-center gap-3 leading-relaxed">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Ricardo Gonçalves – a22208676
              </li>
              <li className="flex items-center gap-3 leading-relaxed">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Ricardo Piedade – a22207722
              </li>
            </ul>
          </div>
          
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-gray700 dark:text-gray300 mb-4">{t('about.team.supervisors')}</h3>
            <ul className="space-y-3 text-gray600 dark:text-gray400">
              <li className="flex items-center gap-3 leading-relaxed">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-gray600 dark:text-gray400 leading-relaxed">Lúcio Studer ({t('about.team.supervisor')})</p>
              </li>
              <li className="flex items-center gap-3 leading-relaxed">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-gray600 dark:text-gray400 leading-relaxed">Martim Mourão ({t('about.team.cosupervisor')})</p>
              </li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-gray700 dark:text-gray300">{t('about.team.collaborator')}</h3>
            <p className="text-gray600 dark:text-gray400 leading-relaxed mb-4">{t('about.team.collaboratorInfo')}</p>
            <ul className="space-y-3 text-gray600 dark:text-gray400">
              <li className="flex items-center gap-3 leading-relaxed">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-gray600 dark:text-gray400 leading-relaxed">Carina Almeida</p>
              </li>
            </ul>
          </div>
          
        </div>
      </div>

      {/* Technology Stack */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-gray700 dark:text-gray300 mb-8 flex items-center gap-3">
          <Code2 className="w-6 h-6 text-primary" />
          {t('about.techStack.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(techStackIcons).map(([key, icon]) => (
            <div key={key} className="glass-card p-6 group hover:glass-medium ">
              <div className="flex items-center gap-3 mb-4">
                <div className="group-hover:scale-110 transition-transform">
                  {icon}
                </div>
                <h3 className="font-semibold text-gray700 dark:text-gray300 lg:text-lg">{t(`about.techStack.${key}.title`)}</h3>
              </div>
              <p className="text-sm text-gray600 dark:text-gray400 leading-relaxed mb-4 lg:text-base">
                {t(`about.techStack.${key}.description`)}
              </p>
              
              {/* Technology Details */}
              <div className="mt-4">
                {key === 'frontend' && (
                  <div className="flex flex-wrap gap-2">
                    {['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'i18next'].map(tech => (
                      <span key={tech} className="text-xs glass-light text-primary px-2 py-1 rounded border border-primary/20">{tech}</span>
                    ))}
                  </div>
                )}
                {key === 'backend' && (
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'API Routes', 'Axios', 'Excel Processing', 'React Query'].map(tech => (
                      <span key={tech} className="text-xs glass-light text-primary px-2 py-1 rounded border border-primary/20">{tech}</span>
                    ))}
                  </div>
                )}
                {key === 'database' && (
                  <div className="flex flex-wrap gap-2">
                    {['InfluxDB', 'Time Series', 'Real-time'].map(tech => (
                      <span key={tech} className="text-xs glass-light text-primary px-2 py-1 rounded border border-primary/20">{tech}</span>
                    ))}
                  </div>
                )}
                {key === 'maps' && (
                  <div className="flex flex-wrap gap-2">
                    {['Mapbox GL', 'Leaflet', 'React Leaflet', 'Geospatial Data'].map(tech => (
                      <span key={tech} className="text-xs glass-light text-primary px-2 py-1 rounded border border-primary/20">{tech}</span>
                    ))}
                  </div>
                )}
                {key === 'tools' && (
                  <div className="flex flex-wrap gap-2">
                    {['Docker', 'ESLint', 'Git', 'Figma', 'VS Code'].map(tech => (
                      <span key={tech} className="text-xs glass-light text-primary px-2 py-1 rounded border border-primary/20">{tech}</span>
                    ))}
                  </div>
                )}
                {key === 'ai' && (
                  <div className="flex flex-wrap gap-2">
                    {['Claude', 'Gemini', 'GPT', 'AI Design', 'Code Review'].map(tech => (
                      <span key={tech} className="text-xs glass-light text-primary px-2 py-1 rounded border border-primary/20">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Architecture */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-gray700 dark:text-gray300 mb-8 flex items-center gap-3">
          <GitBranch className="w-6 h-6 text-primary" />
          {t('about.architecture.title')}
        </h2>
        <p className="text-lg text-gray600 dark:text-gray400 mb-10 leading-relaxed lg:text-xl">
          {t('about.architecture.overview')}
        </p>

        {/* Data Flow */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray700 dark:text-gray300 mb-6 lg:text-2xl">{t('about.architecture.dataFlow.title')}</h3>
          <div className="space-y-4">
            {(t('about.architecture.dataFlow.steps', { returnObjects: true }) as string[]).map((step: string, index: number) => (
              <div key={index} className="glass-card p-4 flex items-center gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray600 dark:text-gray400 leading-relaxed lg:text-lg">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Components */}
        <div>
          <h3 className="text-xl font-semibold text-gray700 dark:text-gray300 mb-6 lg:text-2xl">{t('about.architecture.components.title')}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {(t('about.architecture.components.list', { returnObjects: true }) as string[]).map((component: string, index: number) => (
              <div key={index} className="glass-card p-4 flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-gray600 dark:text-gray400 leading-relaxed lg:text-lg">{component}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-gray700 dark:text-gray300 mb-8 flex items-center gap-3">
          <Gauge className="w-6 h-6 text-primary" />
          {t('about.features.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(featureIcons).map(([key, icon]) => (
            <div key={key} className="glass-card p-6 group hover:glass-medium ">
              <div className="flex items-center gap-3 mb-4">
                <div className="group-hover:scale-110 transition-transform">
                  {icon}
                </div>
                <h3 className="font-semibold text-gray700 dark:text-gray300 lg:text-lg">{t(`about.features.${key}.title`)}</h3>
              </div>
              <p className="text-sm text-gray600 dark:text-gray400 leading-relaxed lg:text-base">
                {t(`about.features.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-gray700 dark:text-gray300 mb-8 flex items-center gap-3">
          <Database className="w-6 h-6 text-primary" />
          {t('about.dataSources.title')}
        </h2>
        <p className="text-lg text-gray600 dark:text-gray400 mb-8 leading-relaxed lg:text-xl">
          {t('about.dataSources.description')}
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {(t('about.dataSources.sources', { returnObjects: true }) as { name: string; description: string; type: string }[]).map((source, index) => {
            // Map source names to their corresponding URLs
            const getSourceUrl = (sourceName: string) => {
              switch (sourceName) {
                case 'Irristrat':
                  return 'https://irristrat.com/new/index.php';
                case 'SIR - Sistema de Informação de Regadio':
                case 'SIR - Irrigation Information System':
                  return 'https://sir.dgadr.gov.pt/outras/reserva-de-agua-nas-albufeiras';
                case 'Sentinel Hub':
                  return 'https://www.sentinel-hub.com/';
                default:
                  return null;
              }
            };
            
            const sourceUrl = getSourceUrl(source.name);
            
            return (
              <div key={index} className="glass-card p-6 group hover:glass-medium ">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray700 dark:text-gray300 text-base lg:text-lg">{source.name}</h3>
                  {sourceUrl && (
                    <a 
                      href={sourceUrl}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:text-primary/80 transition-colors text-sm font-medium flex items-center gap-1 ml-2 group-hover:scale-105"
                    >
                      {t('about.dataSources.visit')}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-sm lg:text-base text-gray600 dark:text-gray400 mb-3 leading-relaxed">{source.description}</p>
                <div className="glass-light px-3 py-1 rounded-lg inline-block">
                  <p className="text-xs lg:text-sm text-gray500 dark:text-gray500 italic leading-relaxed">{source.type}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Future Developments */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-gray700 dark:text-gray300 mb-8 flex items-center gap-3">
          <GitBranch className="w-6 h-6 text-primary" />
          {t('about.future.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {(t('about.future.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
            <div key={index} className="glass-card p-4 flex items-start gap-4">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray600 dark:text-gray400 leading-relaxed lg:text-lg">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Contributions */}
      <div className="glass-card p-8 relative overflow-hidden border-2 border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray700 dark:text-gray300 mb-8 flex items-center gap-3">
            <Users className="w-6 h-6 text-primary" />
            {t('about.contact.title')}
          </h2>
          <p className="text-lg text-gray600 dark:text-gray400 mb-8 leading-relaxed lg:text-xl">
            {t('about.contact.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <a 
              href="mailto:ricgon20035@gmail.com" 
              className="glass-light px-4 py-2 rounded-lg text-primary hover:text-primary/80 font-bold lg:text-lg hover:glass-medium"
            >
              ricgon20035@gmail.com
            </a>
            <a 
              href="mailto:ricardokao2004@gmail.com" 
              className="glass-light px-4 py-2 rounded-lg text-primary hover:text-primary/80 font-bold lg:text-lg hover:glass-medium"
            >
              ricardokao2004@gmail.com
            </a>
          </div>
          <div className="glass-card p-6">
            <p className="text-sm text-gray600 dark:text-gray400 italic leading-relaxed lg:text-base">
              {t('about.contact.feedback')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 