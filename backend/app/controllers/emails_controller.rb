class EmailsController < ApplicationController
  before_action :get_address, only: [:index, :show, :create, :destroy]
  before_action :get_email, only: [:show, :destroy]
  
  def index
    @emails = @address.emails
    render :index
  end

  def show
    bucket = Rails.application.credentials.aws[:bucket]
    key = @email.storage_url

    obj = Aws::S3::Object.new(bucket, key)
    signed_url = obj.presigned_url(:get, expires_in: 900)

    render json: { storage_url: signed_url }
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

  def get_email
    @email = Email.find(params[:id])

    if @email.address != @address
      render json: { error: 'No such email' }, status: 400
    end
  end
end