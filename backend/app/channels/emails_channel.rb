class EmailsChannel < ApplicationCable::Channel
  def subscribed
    address = Address.find_by(address: params[:id])
    puts "Connected to #{address.address}"
    stream_for address
  end
end