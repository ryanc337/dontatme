10.times do
  Address.create(
    address: (Faker::Name.first_name + '.' + Faker::Name.last_name).downcase + '.' + SecureRandom.hex(3)
  )
end

addresses = Address.all

100.times do
  address = addresses.sample

  address.emails.create(
    body: Faker::Movies::HitchhikersGuideToTheGalaxy.quote,
    from: Faker::Internet.safe_email,
    subject: Faker::Movies::HitchhikersGuideToTheGalaxy.marvin_quote,
    sent_at: rand(1..48).hours.ago,
    has_attachments: [true, false].sample,
    storage_url: 'none'
  )
end