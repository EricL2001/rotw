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
        name: 'show_id',
        title: 'Show ID',
        type: 'string',
        description: 'Unique identifier for the show',
        initialValue: () => Math.floor(100000 + Math.random() * 900000).toString(),
        readOnly: true,
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
              {title: 'The Rabbit Hole', value: 'The Rabbit Hole'},
              {title: 'Heist Barrel Arts', value: 'Heist Barrel Arts'},
              {title: 'Cactus Jacks', value: 'Cactus Jacks'}
            ],
        }
      }),
      defineField({
        name: 'showDate',
        type: 'datetime',
        description: 'Date and start time of show',
        initialValue: () => new Date().toISOString().split("T")[0],
        validation: (rule) => rule
          .required(),
      }),
    defineField({
        name: 'price',
        type: 'number',
        description: 'Ticket price. Enter 20 for a $20.00 ticket and so on',
        hidden: ({document}) => document?.showType !== 'Ticketed',
        validation: (rule) => rule.custom((price, context) => {
          const document = context?.document;
          if (document?.showType === 'Ticketed' && (!price || price <= 0)) {
            // If the show type is 'Ticketed' and price is less than or equal to 0, return an error message
            return 'Ticket price must be greater than 0';
          }
          return true;
        }),
      }),
      defineField({
        name: 'promoPrice',
        type: 'number',
        description: 'Promo ticket price',
        hidden: ({document}) => document?.showType !== 'Ticketed',
      }), 
      defineField({
        name: 'dosPrice',
        type: 'number',
        description: 'Day of show price',
        hidden: ({document}) => document?.showType !== 'Ticketed',
        validation: (rule) => rule.custom((dosPrice, context) => {
          const document = context?.document;
          if (document?.showType === 'Ticketed' && (!dosPrice || dosPrice <= 0)) {
            // If the show type is 'Ticketed' and price is less than or equal to 0, return an error message
            return 'DOS price must be greater than 0';
          }
          return true;
        }),
      }), 
      defineField({
        name: 'allotment',
        type: 'number',
        description: 'Number of tickets available based on cap',
        hidden: ({document}) => document?.showType !== 'Ticketed',
        validation: (rule) => rule.custom((allotment, context) => {
          const document = context?.document;
          if (document?.showType === 'Ticketed' && (!allotment || allotment <= 0)) {
            // If the show type is 'Ticketed' and price is less than or equal to 0, return an error message
            return 'Allotment must be greater than 0';
          }
          return true;
        }),
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
        description: 'Support name or additional show info',
      }),
  ],
})
