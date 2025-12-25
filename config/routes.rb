Rails.application.routes.draw do
  scope ActiveStorage.routes_prefix do
    get "/blobs/info/:signed_id" => "bard/attachment_field/blobs#show"
  end
end

