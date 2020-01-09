class AddressesController < ApplicationController
  def create
    @address = Address.new(
      address: (Faker::Name.first_name + '-' + Faker::Name.last_name).downcase + '-' + SecureRandom.hex(3)
    )

    if @address.save
      render :show
    else
      render json: { error: 'Failed to create address' }, status: 400
    end
  end
end
