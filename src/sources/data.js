export default {
	DocumentName: 'Прекрасный документ',
	items: {
		Name: {
			type: 'string',
			description: 'Имя',
		},
		LastName: {
			type: 'string',
			description: 'Фамилия',
		},
		Patronymic: {
			type: 'string',
			description: 'Отчество',
		},
		Contacts: {
			type: 'object',
			description: 'Контактные данные',
			items: {
				Address: {
					type: 'object',
					description: 'Адрес',
					items: {
						City: {
							type: 'string',
							description: 'Город',
						},
						Street: {
							type: 'string',
							description: 'Улица',
						},
						House: {
							type: 'string',
							description: 'Дом',
						},
					},
				},
				Phones: {
					type: 'array',
					description: 'Телефоны',
					items: {
						type: 'string',
					},
				},
			},
		},
	},
}
