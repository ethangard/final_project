class Api::V1::ReportsController < Api::ApplicationController

  def index
    reports = Report.find_by(article_id: params[:article_id])
    # article_id: report_params[:article_id]
    # reports.views += 1
    # reports.save
    p reports
    render json: reports 
  end


  def all
    reports = Report.all
    render json: reports 
  end
  

  # def index(report_params)
  #   report = Report.find_by(article_id: report_params)
  #   # article_id: report_params[:article_id]
  #   report.views += 1
  #   report.save
  #   p report
  #   render json: report
  # end

  def show
    # article = Article.find params[:id]
    report = Report.find article_id: report_params[:article_id]
    p report
    render json: report
  end
  


  def create
    p "Report Params: "
    p report_params
    article = Article.find_by_id(params[:article_id])
    report = Report.new(report_params)    
    if report.save
      p "The report saved"
      p report
    else
      p "the report didn't save"
      p report
    end
    # report = Report.find()
    # p article
    render json: report
  end

  # def create(report_params)
  #   p "Report Params: "
  #   p report_params
  #   article = Article.find_by_id(report_params)
  #   report = Report.new(report_params)    
  #   if report.save
  #     p "The report saved"
  #     p report
  #   else
  #     p "the report didn't save"
  #     p report
  #   end
  #   # report = Report.find()
  #   # p article
  #   render json: report
  # end

  def get_report_view(article_id)
    reports_controller = Report.new
    reports_controller.request = request
    reports_controller.response = response
    reports_controller.index(article_id)
  end
  
  private 

  def report_params
    params.require(:report).permit(:article_id, :user_id)
  end

end
