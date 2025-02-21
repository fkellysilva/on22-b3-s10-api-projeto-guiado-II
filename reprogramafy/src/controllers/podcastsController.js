const { request } = require("express")
const podsJson = require("../models/podcasts.json")

const getAllPods = (request,response) => {
    try {
        response.status(200).json([{
            podcasts: podsJson
        }])
    } catch (error) {
        response.status(500).send([{
            message: "Erro no server"
        }])
    }
}
const getTopics = (request, response) => {
  const topicRequest = request.query.topic; 
  const topicFilter = podsJson.filter((pods) => pods.topic.includes(topicRequest))

  if (topicFilter.length > 0 ) {
    response.status(200).send(topicFilter)
  }else {

  }
}

const addPods = (request, response) => {
  try {
      let nameRequest = request.body.name;
      let podcasterRequest = request.body.podcaster;
      let topicRequest = request.body.topic;
      let starsRequest = request.body.stars;
      
      let newPodcast = {
          id: Math.floor(Date.now() * Math.random()).toString(36),
          name: nameRequest,
          podcaster: podcasterRequest,
          topic: topicRequest,
          stars: starsRequest
      }
      podsJson.push(newPodcast);
      response.status(201).json([{
          message: "Novo Podcast cadastrado.",
          newPodcast
      }])
  } catch (error) {
      console.log(error)
      response.status(500).send([{
          message: "Erro interno ao cadastrar!!"
      }])
      
  }
}

const updatePods = (request, response) => { 
    const idRequest = request.params.id 
    const starsRequest = request. body.stars
    startsFind = podsJson.find((podcast) => podcast.id === idRequest)

    if(startsFind) {
        starsFind.stars = starsRequest
        response.status(200).json ([{
            message: "Classificação atualizada com sucesso", podsJson
        }])
    }else {
        response.status(404).json([{
            message: "Não foi modificado"
        }])
    }
}

const deletePods = (request, response) =>{
    const idRequest = request.params.id
    const indicePods = podsJson.findIndex((podcast) => podcast.id == idRequest) 

    podsJson.splice(indicePods, 1)

    if (indicePods) {
        response.status(200).json([{
            message: "O podcast deletado!!",
            "podcast deletado": idRequest, 
            podsJson
        }])
    } else {
        response.status(404).send([{
            message: "Podcast não deletado!!"
        }])
    }
}
module.exports = {
    getAllPods,
    getTopics,
    addPods,
    updatePods,
    deletePods
}
