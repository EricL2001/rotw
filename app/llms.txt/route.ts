import { NextResponse } from 'next/server';

export async function GET() {
  const llmsContent = `# Records On The Wall

> Records On The Wall partners with independent venues and breweries to provide booking, promotion, and ticketing services for live music events in Charlotte, NC and Denver, CO.

The music is diverse and ranges from up-and-coming artists to established bands in the areas of bluegrass, jam, funk, rock, soul and beyond.

## Key Areas
- [Upcoming Shows](https://www.recordsonthewall.co/shows): Browse upcoming live shows in Charlotte, NC and Denver, CO. 
- [About](https://www.recordsonthewall.co/about): Learn more about Records On The Wall and our beginnings.
- [Home](https://www.recordsonthewall.co/): Learn more about our platform and mission.  

## About
Records On The Wall partners with independent venues and breweries to provide booking, promotion, and ticketing services for live music events in Charlotte, NC and Denver, CO.
The music is diverse and ranges from up-and-coming artists to established bands in the areas of bluegrass, jam, funk, rock, soul and beyond.

## Contact
- [Email](mailto:info@recssonthewall.com)
- [Facebook](https://www.facebook.com/reconthewall)
- [Instagram](https://www.instagram.com/recsonthewall)

${new Date().toISOString().split('T')[0]}
`;

  return new NextResponse(llmsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}