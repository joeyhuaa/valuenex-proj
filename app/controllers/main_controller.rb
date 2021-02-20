require 'byebug'
require 'csv'

class MainController < ApplicationController
  skip_before_action :verify_authenticity_token

  def home
  end

  def new_data
    @data = Data.new
    @data.included_data = JSON.parse( params['included_data'] )
    @data.assigned_data = JSON.parse( params['assigned_data'] )
    @data.file = params['file']
    @data.save
  end

  def new_data_stream
    @data = Data.new
    @data.included_data = [] # arr of objs
    @data.assigned_data = [] # arr of objs

    render :json => {
      stream: params['stream']
    }
  end
end
