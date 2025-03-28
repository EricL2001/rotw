import {defineField, defineType} from 'sanity'

export const addShow = defineType({
  name: 'post',
  type: 'document',
  title: 'Add Show',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Name of the show or event',
      validation: (rule) => rule
        .required(),
    }),
    defineField({
        name: 'slug',
        type: 'slug',
        readOnly: false,
        options: {source: 'title'},
        validation: (rule) => rule
          .required(),
      }),
    defineField({
        name: 'showType',
        type: 'string',
        options: {
            list: [
              {title: 'Free', value: 'Free'},
              {title: 'Ticketed', value: 'Ticketed'}
            ], // <-- predefined values
            layout: 'radio' // <-- defaults to 'dropdown'
        },
        validation: (rule) => rule
          .required(),
    }),
    defineField({
        name: 'venue',
        type: 'string',
        validation: (rule) => rule
          .required(),
          options: {
            list: [
              {title: 'Heist Brewery', value: 'Heist Brewery - NoDa'},
              {title: 'Jacks Live', value: 'Jacks Live'},
              {title: 'Heist Barrel Arts', value: 'Heist Barrel Arts'},
              {title: 'Cactus Jacks', value: 'Cactus Jacks'}
            ],
        }
      }),
      defineField({
        name: 'showDate',
        type: 'datetime',
        description: 'Date and start time of show',
        initialValue: () => new Date()
          .toISOString(),
        validation: (rule) => rule
          .required(),
      }),
    defineField({
        name: 'price',
        type: 'number',
        description: 'Ticket price. ie, 20 for $20.  Not 20.00',
        validation: (rule) => rule
          .required(),
      }),
      defineField({
        name: 'promoPrice',
        type: 'number',
        description: 'Promo ticket price',
        validation: (rule) => rule
          .required(),
      }), 
      defineField({
        name: 'dosPrice',
        type: 'number',
        description: 'Day of show price',
        validation: (rule) => rule
          .required(),
      }), 
      defineField({
        name: 'allotment',
        type: 'number',
        description: 'Number of tickets available based on cap',
        validation: (rule) => rule
          .required(),
      }),
      defineField({
        name: 'image',
        type: 'image',
        description: 'Image for show header.  Please keep to xxx size',
      }),
      defineField({
        name: 'description',
        type: 'array',
        of: [{type: 'block'}],
      }),
      defineField({
        name: 'bandName',
        type: 'string',
        description: 'Headliner or band name',
        validation: (rule) => rule
          .required(),
      }),
      defineField({
        name: 'supportName',
        type: 'string',
        description: 'Support name',
      }),
      defineField({
        name: 'googleMapsUrl',
        type: 'url',
        description: 'Google Maps URL',
        validation: (rule) => rule
          .required(),
      }),
  ],
})
