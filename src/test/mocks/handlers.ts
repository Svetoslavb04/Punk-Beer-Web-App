import { rest } from 'msw';

export const beers = [
  {
    id: 1,
    name: 'Buzz',
    description:
      'A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.',
    image_url: 'https://images.punkapi.com/v2/keg.png',
  },
  {
    id: 2,
    name: 'Trashy Blonde',
    description:
      'A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.',
    image_url: 'https://images.punkapi.com/v2/2.png',
  },
  {
    id: 3,
    name: 'Berliner Weisse With Yuzu - B-Sides',
    description: 'Japanese citrus fruit intensifies the sour nature of this German classic.',
    image_url: 'https://images.punkapi.com/v2/keg.png',
  },
  {
    id: 4,
    name: 'Pilsen Lager',
    description:
      'Our Unleash the Yeast series was an epic experiment into the differences in aroma and flavour provided by switching up your yeast. We brewed up a wort with a light caramel note and some toasty biscuit flavour, and hopped it with Amarillo and Centennial for a citrusy bitterness. Everything else is down to the yeast. Pilsner yeast ferments with no fruity esters or spicy phenols, although it can add a hint of butterscotch.',
    image_url: 'https://images.punkapi.com/v2/4.png',
  },
  {
    id: 5,
    name: 'Avery Brown Dredge',
    description:
      'An Imperial Pilsner in collaboration with beer writers. Tradition. Homage. Revolution. We wanted to showcase the awesome backbone of the Czech brewing tradition, the noble Saaz hop, and also tip our hats to the modern beers that rock our world, and the people who make them.',
    image_url: 'https://images.punkapi.com/v2/5.png',
  },
  {
    id: 6,
    name: 'Electric India',
    description:
      'Re-brewed as a spring seasonal, this beer – which appeared originally as an Equity Punk shareholder creation – retains its trademark spicy, fruity edge. A perfect blend of Belgian Saison and US IPA, crushed peppercorns and heather honey are also added to produce a genuinely unique beer.',
    image_url: 'https://images.punkapi.com/v2/6.png',
  },
];

export const handlers = [
  rest.get('https://api.punkapi.com/v2/beers', (req, res, ctx) => {
    const search = req.url.searchParams.get('beer_name');
    const page = Number(req.url.searchParams.get('page')) || 1;
    const perPage = Number(req.url.searchParams.get('per_page')) || beers.length;
    const ids =
      req.url.searchParams
        .get('ids')
        ?.split('|')
        .map(e => Number(e)) || [];

    let result = beers;

    if (search) {
      result = beers.filter(b => b.name.toLocaleLowerCase().includes(search));
    }

    if (ids.length > 0) {
      result = result.filter(b => ids.includes(b.id));
    }

    const offset = perPage * (page - 1);
    const paginatedBeers = result.slice(offset, perPage * page);

    return res(ctx.json(paginatedBeers));
  }),
];
