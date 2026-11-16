import { photo } from '../lib/photo'

export const company = {
  name: 'Vantage',
  phone: '(212) 555-0148',
  phoneHref: 'tel:+12125550148',
  email: 'hello@vantageestates.com',
  emailHref: 'mailto:hello@vantageestates.com',
  address: '418 Madison Avenue, Suite 1200, New York, NY 10017',
  hours: 'Monday to Friday, 8:00–7:00 ET. Saturday by appointment.',
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/buy', label: 'Buy' },
  { to: '/rent', label: 'Rent' },
  { to: '/sell', label: 'Sell' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
]

export const agents = [
  {
    id: 'amara',
    name: 'Amara Ellison',
    role: 'Founding broker',
    phone: '(212) 555-0148',
    email: 'amara@vantageestates.com',
    image: photo('1573496359142-b8d87734a5a2', 900),
    bio: 'Amara opened the Madison Avenue desk in 2008 and still takes the first call on estates in Los Angeles and Miami.',
  },
  {
    id: 'julian',
    name: 'Julian Cho',
    role: 'Residential advisor, New York',
    phone: '(212) 555-0161',
    email: 'julian@vantageestates.com',
    image: photo('1560250097-0b93528c311a', 900),
    bio: 'Julian works lofts, townhouses, and the occasional penthouse. He would rather show three homes than thirty.',
  },
  {
    id: 'priya',
    name: 'Priya Raman',
    role: 'Commercial director',
    phone: '(512) 555-0194',
    email: 'priya@vantageestates.com',
    image: photo('1580489944761-15a19d654956', 900),
    bio: 'Priya leads offices and retail for owners, tenants, and investors. She stays on a file until the keys change hands.',
  },
  {
    id: 'ellis',
    name: 'Ellis Ward',
    role: 'City residential',
    phone: '(312) 555-0177',
    email: 'ellis@vantageestates.com',
    image: photo('1507003211169-0a1dd7228f2d', 900),
    bio: 'Ellis covers Chicago, Seattle, Austin, Boston, and San Francisco, and writes every listing in plain language.',
  },
]

export function getAgent(id) {
  return agents.find((agent) => agent.id === id) || agents[0]
}

export const propertyTypes = {
  residential: ['House', 'Apartment', 'Villa', 'Penthouse', 'Townhouse'],
  commercial: ['Office', 'Retail'],
}

export const allTypes = [...propertyTypes.residential, ...propertyTypes.commercial]

export const salePrices = [
  { label: 'Any price', value: '' },
  { label: 'Under $1M', value: '0-1000000' },
  { label: '$1M – $2.5M', value: '1000000-2500000' },
  { label: '$2.5M – $5M', value: '2500000-5000000' },
  { label: '$5M – $10M', value: '5000000-10000000' },
  { label: '$10M+', value: '10000000-' },
]

export const rentPrices = [
  { label: 'Any price', value: '' },
  { label: 'Under $5,000', value: '0-5000' },
  { label: '$5,000 – $10,000', value: '5000-10000' },
  { label: '$10,000 – $20,000', value: '10000-20000' },
  { label: '$20,000+', value: '20000-' },
]

export const bedOptions = [
  { label: 'Any beds', value: '' },
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
  { label: '5+', value: '5' },
]

export const cities = [
  {
    name: 'New York',
    blurb: 'Lofts, townhouses, and the occasional penthouse.',
    image: photo('1534430480872-3498386e7856', 1400),
  },
  {
    name: 'Los Angeles',
    blurb: 'Canyons, courtyards, and the coast.',
    image: photo('1444723121867-7a241cacace9', 1400),
  },
  {
    name: 'Miami',
    blurb: 'Light, water, and rooms that open.',
    image: photo('1533106497176-45ae19e68ba2', 1400),
  },
  {
    name: 'Chicago',
    blurb: 'Brick, parks, and long windows.',
    image: photo('1494522855154-9297ac14b55f', 1400),
  },
  {
    name: 'Austin',
    blurb: 'Hills, porches, and new downtown glass.',
    image: photo('1531218150217-54595bc2b934', 1400),
  },
  {
    name: 'Seattle',
    blurb: 'Ferries, fir trees, and quiet streets.',
    image: photo('1502175353174-a7a70e73b362', 1400),
  },
  {
    name: 'San Francisco',
    blurb: 'Hills, bay windows, and shopfronts.',
    image: photo('1449034446853-66c86144b0ad', 1400),
  },
  {
    name: 'Boston',
    blurb: 'Brownstones and a walkable scale.',
    image: photo('1501979376754-2ff867a4f659', 1400),
  },
]

export const offices = [
  {
    city: 'New York',
    address: '418 Madison Avenue, Suite 1200',
    phone: '(212) 555-0148',
  },
  {
    city: 'Los Angeles',
    address: '9100 Wilshire Boulevard, Beverly Hills',
    phone: '(310) 555-0172',
  },
  {
    city: 'Miami',
    address: '1395 Brickell Avenue, Floor 18',
    phone: '(305) 555-0164',
  },
]

export const services = [
  {
    title: 'Buying',
    text: 'A short list, private tours, and negotiation that stays calm when the number moves.',
  },
  {
    title: 'Selling',
    text: 'Pricing you can explain, photographs that tell the truth, and one advisor through closing.',
  },
  {
    title: 'Renting',
    text: 'Houses, apartments, and furnished stays, with tours arranged in the week you need them.',
  },
  {
    title: 'Commercial',
    text: 'Offices and retail for owners, tenants, and investors who want the lease read aloud.',
  },
  {
    title: 'Relocation',
    text: 'One desk when the move crosses cities, so you are not starting the search over.',
  },
  {
    title: 'Advisory',
    text: 'Hold times, renovation costs, and what a street is actually doing this season.',
  },
]

export const testimonials = [
  {
    quote: 'They talked us out of the first apartment. The second one is the one we still talk about.',
    name: 'Elena Voss',
    detail: 'Bought in Tribeca',
  },
  {
    quote: 'Our retail lease was a maze. Vantage sent one person who stayed until the keys were in my hand.',
    name: 'Marcus Adeyemi',
    detail: 'Leased in the Design District',
  },
  {
    quote: 'I sold the house from another city. Every update was plain English, and the number was the number.',
    name: 'Helen Cho',
    detail: 'Sold in Pacific Palisades',
  },
]

export const tickerItems = [
  'New York',
  'Los Angeles',
  'Miami',
  'Chicago',
  'Austin',
  'Seattle',
  'San Francisco',
  'Boston',
  'Residential',
  'Commercial',
  'Private tours',
]
