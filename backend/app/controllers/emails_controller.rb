class EmailsController < ApplicationController
  before_action :get_address, only: [:index]
  
  def index
    @emails = @address.emails
    render :index
  end

  private

  def get_address
    @address = Address.find_by(address: params[:address_id])
    
    if !@address
      render json: { error: 'Email address does not exist.' }, status: 400
    end
  end
end