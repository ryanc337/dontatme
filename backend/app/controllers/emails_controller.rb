class EmailsController < ApplicationController
  before_action :get_address, only: [:index, :create, :destroy]
  
  def index
    @emails = @address.emails
    render :index
  end

  def create
    @email = @address.emails.new(email_params)

    if @email.save
      render json: { status: 200 }
    else
      render json: { error: 'Failed to create email' }, status: 400
    end
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

  def email_params
    params.require(:email).permit(:body, :from, :subject, :sent_at, :has_attachments, :storage_url)
  end

  def get_address
    @address = Address.find_by(address: params[:address_id])
    
    if !@address
      render json: { error: 'Email address does not exist.' }, status: 400
    end
  end
end