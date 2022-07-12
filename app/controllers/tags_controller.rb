class TagsController < ApplicationController

    def index 
        tags = Tag.all
        render json: tags, status: :ok
    end

    def show
        tag = find_tag
        render json: tag, status: :ok
    end

    def create
        arr = []
        params[:tags].each do |tag|
            if (Tag.find_by(hashtag:tag))
                arr << Tag.find_by(hashtag:tag)
            else
                newTag = Tag.create!(hashtag:tag)
                arr << newTag
            end
        end
        # byebug
        render json: arr, status: :created
    end
    #     tag = Tag.create!(tag_params)

    #     render json: tag, status: :ok
    # end

    def update
        tag = find_tag
        tag.update!(params[:hashtag])
        render json: tag, status: :created
    end

    def destroy
        tag = find_tag
        tag.destroy
        head :no_content
    end

    def search_tags
        # params = ["ps5", "ps3", "Ponyta"]
        # params_string = "pon"
        result = Tag.where(hashtag: params[:tagSearch])
        
        search = result.map {|s| s.items}.flatten
        # search2 = Item.where("lower(name) LIKE ?", "%#{params_string.downcase}%")
        render json: search.uniq
    end

    private

    def find_tag
        Tag.find(params[:id])
    end

    def tag_params
        params.permit(tags: [:hashtag]).require(:tags)
    end
end
