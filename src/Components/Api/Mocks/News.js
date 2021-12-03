/* mock response for warranty forms */
import { images } from 'assets';
import moment from 'moment';
const TYPES = {
  ARTICLE: 'article',
  VIDEO: 'video',
  GALLERY: 'gallery',
  EVENT: 'event',
};

const mockNews = [
  {
    id: 1,
    title: 'The title of the article',
    slug: 'the-title-of-the-article-1',
    headline: 'The Nsri – Saving Lives No Matter The Weather The Nsri – Saving Lives No Matter The Weather The Nsri – Saving Lives No Matter The Weather The Nsri – Saving Lives No Matter The Weather',
    content: 'Lorem ipsum article text.',
    type: TYPES.EVENT,
    category: 'video',
    // image: 'https://picsum.photos/200/300'
    image: images.social_footer_bike,
    event_start_date: moment().unix(Math.random() * 1000000),
    event_end_date: moment().unix(Math.random() * 1000000),
    venue: 'WORLD OF YAMAHA',
  },
  {
    id: 2,
    title: 'The title of the article',
    slug: 'the-title-of-the-article-2',
    headline: 'The Asri – Saving Lives No Matter The Weather',
    content: 'Lorem ipsum article text.',
    type: TYPES.VIDEO,
    category: 'news',
    // image: 'https://picsum.photos/200/300',
    image: images.social_footer_bike,
    created_at: moment().unix(Math.random() * 1000000),
    url: 'https://www.youtube.com/watch?v=mIYzp5rcTvU',
  },
  {
    id: 3,
    title: 'The title of the article',
    slug: 'the-title-of-the-article-3',
    headline: 'The Bsri – Saving Lives No Matter The Weather The Nsri – Saving Lives No Matter The Weather The Nsri – Saving Lives No Matter The Weather',
    content: 'Lorem ipsum article text.',
    type: TYPES.ARTICLE,
    category: 'TEST CATEGORY',
    // image: 'https://picsum.photos/200/300'
    image: images.social_footer_bike,
    created_at: moment().unix(Math.random() * 1000000),
  },
  {
    id: 4,
    title: 'The title of the article',
    slug: 'the-title-of-the-article-4',
    headline: 'The Csri – Saving Lives No Matter The Weather',
    content: 'Lorem ipsum article text.',
    type: TYPES.GALLERY,
    images: [
      'https://picsum.photos/200/306',
      'https://picsum.photos/201/305',
      'https://picsum.photos/202/304',
      'https://picsum.photos/203/303',
      'https://picsum.photos/204/302',
      'https://picsum.photos/205/301',
    ],
    category: 'SUNDAYS',
    // image: 'https://picsum.photos/200/300'
    image: images.social_footer_music,
    created_at: moment().unix(Math.random() * 1000000),
  },
  {
    id: 44,
    title: 'The title of the article',
    slug: 'the-title-of-the-article-4',
    headline: 'The Csri – Saving Lives No Matter The Weather',
    content: 'Lorem ipsum article text.',
    type: TYPES.GALLERY,
    images: [
      'https://picsum.photos/200/306',
      'https://picsum.photos/201/305',
      'https://picsum.photos/202/304',
      'https://picsum.photos/203/303',
      'https://picsum.photos/204/302',
      'https://picsum.photos/205/301',
    ],
    category: 'SATURDAYS',
    // image: 'https://picsum.photos/200/300'
    image: images.social_footer_bike,
    created_at: moment().unix(Math.random() * 1000000),
  },
  {
    id: 5,
    title: 'The title of the article',
    slug: 'the-title-of-the-article-5',
    headline: 'The Csri – Saving Lives No Matter The Weather',
    content: 'Lorem ipsum article text.',
    type: TYPES.ARTICLE,
    category: 'news',
    // image: 'https://picsum.photos/200/300'
    image: images.social_footer_bike,
    created_at: moment().unix(Math.random() * 1000000),
  },
  {
    id: 6,
    title: 'The title of the article',
    slug: 'the-title-of-the-article-6',
    headline: 'The Csri – Saving Lives No Matter The Weather',
    content: 'Lorem ipsum article text.',
    type: TYPES.ARTICLE,
    category: 'news',
    // image: 'https://picsum.photos/200/300'
    image: images.social_footer_bike,
    created_at: moment().unix(Math.random() * 1000000),
  },
  {
    id: 7,
    title: 'The title of the article',
    slug: 'the-title-of-the-article-7',
    headline: 'The Csri – Saving Lives No Matter The Weather',
    content: 'Lorem ipsum article text.',
    type: TYPES.ARTICLE,
    category: 'news',
    // image: 'https://picsum.photos/200/300'
    image: images.social_footer_bike,
    created_at: moment().unix(Math.random() * 1000000),
  },
  {
    id: 8,
    title: 'The title of the article',
    slug: 'the-title-of-the-article-8',
    headline: 'The Csri – Saving Lives No Matter The Weather',
    content: 'Lorem ipsum article text.',
    type: TYPES.ARTICLE,
    category: 'news',
    // image: 'https://picsum.photos/200/300'
    image: images.social_footer_bike,
    created_at: moment().unix(Math.random() * 1000000),
  },
  {
    id: 9,
    title: 'The title of the article',
    slug: 'the-title-of-the-article-9',
    headline: 'The Csri – Saving Lives No Matter The Weather',
    content: 'Lorem ipsum article text.',
    type: TYPES.ARTICLE,
    category: 'news',
    // image: 'https://picsum.photos/200/300'
    image: images.social_footer_bike,
    created_at: moment().unix(Math.random() * 1000000),
  },
  {
    id: 10,
    title: 'The title of the article',
    slug: 'the-title-of-the-article-10',
    headline: 'The Csri – Saving Lives No Matter The Weather',
    content: 'Lorem ipsum article text.',
    type: TYPES.ARTICLE,
    category: 'news',
    // image: 'https://picsum.photos/200/300'
    image: images.social_footer_bike,
    created_at: moment().unix(Math.random() * 1000000),
  },
];

const mockVideos = [
  {
    id: 1,
    category: "motorcycles",
    title: "THE NSRI – SAVING LIVES NO MATTER THE WEATHER",
    description: "A light weight and torque inspired twin cylinder at a great value inviting you to experience the thrills of the dark side….",
    published_date: "2019-08-14",
    preview_img: "['uploads/video1.png', 'uploads/video2.png', 'uploads/video3.png', 'uploads/video4.png']",
    video: "https://www.youtube.com/watch?v=dStJ7A6u1EE",
    created_at: "2019-08-13 22:00:00",
    updated_at: "2019-08-13 22:00:00"
  },
  {
    id: 2,
    category: "motorcycles",
    title: "THE NSRI – SAVING LIVES NO MATTER THE WEATHER",
    description: "A light weight and torque inspired twin cylinder at a great value inviting you to experience the thrills of the dark side….",
    published_date: "2019-08-14",
    preview_img: "['uploads/video1.png', 'uploads/video2.png', 'uploads/video3.png', 'uploads/video4.png']",
    video: "https://www.youtube.com/watch?v=dStJ7A6u1EE",
    created_at: "2019-08-13 22:00:00",
    updated_at: "2019-08-13 22:00:00"
  },
  {
    id: 3,
    category: "motorcycles",
    title: "THE NSRI – SAVING LIVES NO MATTER THE WEATHER",
    description: "A light weight and torque inspired twin cylinder at a great value inviting you to experience the thrills of the dark side….",
    published_date: "2019-08-14",
    preview_img: "['uploads/video1.png', 'uploads/video2.png', 'uploads/video3.png', 'uploads/video4.png']",
    video: "https://www.youtube.com/watch?v=dStJ7A6u1EE",
    created_at: "2019-08-13 22:00:00",
    updated_at: "2019-08-13 22:00:00"
  },
  {
    id: 4,
    category: "motorcycles",
    title: "THE NSRI – SAVING LIVES NO MATTER THE WEATHER",
    description: "A light weight and torque inspired twin cylinder at a great value inviting you to experience the thrills of the dark side….",
    published_date: "2019-08-14",
    preview_img: "['uploads/video1.png', 'uploads/video2.png', 'uploads/video3.png', 'uploads/video4.png']",
    video: "https://www.youtube.com/watch?v=dStJ7A6u1EE",
    created_at: "2019-08-13 22:00:00",
    updated_at: "2019-08-13 22:00:00"
  }
];

const mockGalleries = [
  {
      id: 1,
      category: "motorcycles",
      gallery_image: "['lara/uploads/image1.png', 'lara/uploads/image2.png', 'lara/uploads/image3.png', 'lara/uploads/image4.png']",
      created_at: "2019-08-13 22:00:00",
      updated_at: "2019-08-13 22:00:00"
  },
  {
      id: 2,
      category: "music",
      gallery_image: "['lara/uploads/image1.png', 'lara/uploads/image2.png', 'lara/uploads/image3.png', 'lara/uploads/image4.png']",
      created_at: "2019-08-13 22:00:00",
      updated_at: "2019-08-13 22:00:00"
  },
  {
      id: 3,
      category: "home audio",
      gallery_image: "['lara/uploads/image1.png', 'lara/uploads/image2.png', 'lara/uploads/image3.png', 'lara/uploads/image4.png']",
      created_at: "2019-08-13 22:00:00",
      updated_at: "2019-08-13 22:00:00"
  },
  {
      id: 4,
      category: "pro audio",
      gallery_image: "['lara/uploads/image1.png', 'lara/uploads/image2.png', 'lara/uploads/image3.png', 'lara/uploads/image4.png']",
      created_at: "2019-08-13 22:00:00",
      updated_at: "2019-08-13 22:00:00"
  },
  {
      id: 5,
      category: "marine",
      gallery_image: "['lara/uploads/image1.png', 'lara/uploads/image2.png', 'lara/uploads/image3.png', 'lara/uploads/image4.png']",
      created_at: "2019-08-13 22:00:00",
      updated_at: "2019-08-13 22:00:00"
  },
  {
      id: 6,
      category: "golf cars",
      gallery_image: "['lara/uploads/image1.png', 'lara/uploads/image2.png', 'lara/uploads/image3.png', 'lara/uploads/image4.png']",
      created_at: "2019-08-13 22:00:00",
      updated_at: "2019-08-13 22:00:00"
  },
  {
      id: 7,
      category: "power products",
      gallery_image: "['lara/uploads/image1.png', 'lara/uploads/image2.png', 'lara/uploads/image3.png', 'lara/uploads/image4.png']",
      created_at: "2019-08-13 22:00:00",
      updated_at: "2019-08-13 22:00:00"
  }
];

const mockHistoryArticles = [
  {
      id: 1,
      category: "News",
      blog_img: "lara/uploads/blog.png",
      title: "Sa racers star Around the world",
      slug: "sa-racers-star-around-the-world",
      description: "Sheridan Morias was part of the WEPOL Yamaha team that ended fourth in the Slovakian FIA",
      published_date: "2019-08-13",
      created_at: "2019-08-12 22:00:00",
      updated_at: "2019-08-12 22:00:00"
  },
  {
      id: 2,
      category: "News",
      blog_img: "lara/uploads/blog1.png",
      title: "Yamaha further increase safety of two-wheelers",
      slug: "yamaha-further-increase-safety-of-two-wheelers",
      description: "A light weight and torque inspired twin cylinder at a great value inviting you to experience the thrills of the dark side….",
      published_date: "2019-08-13",
      created_at: "2019-08-12 22:00:00",
      updated_at: "2019-08-12 22:00:00"
  },
  {
      id: 3,
      category: "News",
      blog_img: "lara/uploads/blog2.png",
      title: "YAMAHA Yard Built at Bike Shed Paris",
      slug: "yamaha-yard-built-at-bike-shed-paris",
      description: "A light weight and torque inspired twin cylinder at a great value inviting you to experience the thrills of the dark side….",
      published_date: "2019-08-13",
      created_at: "2019-08-12 22:00:00",
      updated_at: "2019-08-12 22:00:00"
  },
  {
      id: 4,
      category: "News",
      blog_img: "lara/uploads/blog3.png",
      title: "Yamaha breathes Monster energy into the YZF-R125",
      slug: "yamaha-breathes-monster-energy-into-the-yzf-r125",
      description: "A light weight and torque inspired twin cylinder at a great value inviting you to experience the thrills of the dark side….",
      published_date: "2019-08-13",
      created_at: "2019-08-12 22:00:00",
      updated_at: "2019-08-12 22:00:00"
  },
  {
      id: 5,
      category: "News",
      blog_img: "lara/uploads/blog4.png",
      title: "Jarno Saarinen Honoured at Celebration",
      slug: "jarno-saarinen-honoured-at-celebration",
      description: "A light weight and torque inspired twin cylinder at a great value inviting you to experience the thrills of the dark side….",
      published_date: "2019-08-13",
      created_at: "2019-08-12 22:00:00",
      updated_at: "2019-08-12 22:00:00"
  }
];

const getNews = mockAdapter => {
  mockAdapter.onGet('/news').reply(200, mockNews);
  mockAdapter.onGet('/blog_video').reply(200, mockVideos);
  mockAdapter.onGet('/blog_gallery').reply(200, mockGalleries);
  mockAdapter.onGet('/blog_history').reply(200, mockHistoryArticles);
};

const getArticle = mockAdapter => {
  mockAdapter.onGet(/\/news\/.+/).reply(config => {
    // console.log('get article config', config.params);
    const article = mockNews.find(article => article.slug === config.url.replace('/news/', ''));
    console.info('article', article);
    if (article) {
      return [200, article];
    } else {
      return [404, {}];
    }
  });
}

export default function applyNewsMocks(mockAdapter) {
  getNews(mockAdapter);
  getArticle(mockAdapter);
}
