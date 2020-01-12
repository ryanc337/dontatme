json.address @address.address

json.emails @emails do |email|
  json.(email, :id, :body, :from, :subject, :sent_at, :has_attachments, :is_read)
end