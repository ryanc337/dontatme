class Email < ApplicationRecord
  belongs_to :address
  default_scope { order(sent_at: :desc) }

  def serialize
    serialized = Jbuilder.new do |email|
      email.(self, :id, :body, :from, :subject, :sent_at, :has_attachments, :is_read)
    end

    serialized.target!
  end
end
