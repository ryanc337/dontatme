class EmailsController < ApplicationController
  before_action :get_address, only: [:index, :destroy]
  
  def index
    @emails = @address.emails
    render :index
  end

  def destroy
    @email = Email.find(params[:id])

    if @email.address != @address
      render json: { error: 'No such email' }, status: 400
      return
    end

    if @email.destroy
      render json: { message: 'Deleted' }
    else
      render json: { error: 'Could not delete email.' }, status: 400
    end
  end

  private

  def get_address
    @address = Address.find_by(address: params[:address_id])
    
    if !@address
      render json: { error: 'Email address does not exist.' }, status: 400
    end
  end
end