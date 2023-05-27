class InvoicesController < ApplicationController
  def index
    respond_to do |format|
      format.json do
        render json: Invoice.all
      end
    end
  end

  def create
    respond_to do |format|
      format.json do
        invoice = Invoice.new(params.permit(%i[amount due_at scan]))
        if invoice.save
          render json: { error: nil }
        else
          render json: { error: invoice.errors.full_messages[0] }
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        invoice = Invoice.find(params[:id])
        render json: {
          **invoice.attributes,
          available_actions: invoice.available_actions,
          scan: url_for(invoice.scan)
        }
      end
    end
  end

  def update
    respond_to do |format|
      format.json do
        print params.inspect
        invoice = Invoice.find(params[:id])
        if invoice.available_actions.include?(params[:perform_action]) && invoice.update(status: {
          approve: 'approved',
          reject: 'rejected',
          purchase: 'purchased',
          close: 'closed'
        }[params[:perform_action].to_sym])
          return render json: { error: nil }
        end

        render json: { error: invoice.errors.full_messages[0] || 'something went wrong' }
      end
    end
  end
end
