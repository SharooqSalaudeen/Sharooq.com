import Link from 'next/link'
import Image from 'next/image'

import { GhostPostOrPage, GhostSettings } from '@lib/ghost'

interface HomeTopicCardsProps {
  settings: GhostSettings
  post?: GhostPostOrPage
  num?: number
  isHome?: boolean
}

const cards = [
  {
    slug: '/articles',
    icon: '/articles.png',
    name: 'Articles',
    desc: 'I write about a broad spectrum of programming paradigms, bug fixes and solutions ',
  },
  {
    slug: 'book-summaries',
    icon: '/books.png',
    name: 'Book Summaries',
    desc: 'My summary of books that truly inspired and changed the way I view about my life',
  },
  {
    slug: 'about',
    icon: '/writer.png',
    name: 'About Me',
    desc: 'Who I am? what I am working on right now? and Where to contact me?',
  },
]

export const HomeTopicCards = ({ settings }: HomeTopicCardsProps) => {
  const { nextImages } = settings.processEnv

  return (
    <>
      <div className="home-topic-cards">
        {cards.map((topic, idx) => (
          <Link key={idx} href={topic.slug}>
            <div className="home-topic-card">
              <div className="icon" style={{}}>
                <Image src={topic.icon} alt={topic.name} layout="fixed" objectFit="fill" quality={nextImages.quality} width="48px" height="48px" />
              </div>
              <h2>{topic.name}</h2>
              <p>{topic.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
