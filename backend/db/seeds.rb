10.times do
  Address.create(
    address: (Faker::Name.first_name + '-' + Faker::Name.last_name).downcase + '-' + SecureRandom.hex(3)
  )
end

addresses = Address.all

100.times do
  address = addresses.sample
  address.emails.create(
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    from: "[{\"address\":\"#{Faker::Internet.safe_email}\",\"name\":\"#{Faker::Name.name}\"}]",
    subject: 'Testing Testing',
    sent_at: '2020-01-08T17:43:23.000Z',
    has_attachments: true,
    storage_url: 'mt6vl3oko69vqju3q52tflgc92kvlsrpa3rm8mg1'
  )
end