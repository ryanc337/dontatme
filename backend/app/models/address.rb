class Address < ApplicationRecord
  has_many :emails

  after_create :generate_mock_emails

  private

  def generate_mock_emails
    self.emails.create([
      {
        body: "Welcome! Join us on our mission for greater privacy!",
        from: "[{\"address\":\"hello@dontatme.ca\",\"name\":\"Don't@Me\"}]",
        subject: "Welcome to Don't@Me!",
        sent_at: Time.now,
        has_attachments: false,
        storage_url: "mockqvlc5cv4gjb1026ovp3uce1d3slh44nrp0g3"
      }, {
        body: "Using Don't@Me is easy! Follow these simple steps:",
        from: "[{\"address\":\"ryan@dontatme.ca\",\"name\":\"Ryan Cordingley\"}]",
        subject: "How to Get Started!",
        sent_at: 1.second.ago,
        has_attachments: false,
        storage_url: "mockqvlc5cv4gjb1026ovp3uce1d3slh44nrp0g3"
      }, {
        body: "Here are the top 10 tips for protecting your privacy!",
        from: "[{\"address\":\"teddy@dontatme.ca\",\"name\":\"Teddy Leung\"}]",
        subject: "Top 10 Privacy Tips!",
        sent_at: 2.seconds.ago,
        has_attachments: false,
        storage_url: "mockqvlc5cv4gjb1026ovp3uce1d3slh44nrp0g3"
      }
    ]
    )
  end
end
