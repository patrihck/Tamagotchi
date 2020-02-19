const PetType = require('../database/models/pet-type');
const PetProperty = require('../database/models/pet-property');
const petRepo = require('../database/repository/pet-repository');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  const properties = [];
  const incomingProperties = req.payload.properties;

  for (let i = 0; i < incomingProperties.length; i++) {
    properties.push(
      new PetProperty(
        null,
        incomingProperties[i].name,
        incomingProperties[i].value,
        incomingProperties[i].weight,
        incomingProperties[i].valuePerTime
      )
    );
  }

  try {
    const newPetType = new PetType(req.payload.name, properties);

    await petRepo.addPetType(newPetType, req);
    const petTypeId = (await petRepo.getPetTypeByName(newPetType.name, req)).id;

    newPetType.properties.forEach(async property => {
      property.petTypeId = petTypeId;
      await petRepo.addPetProperty(property, req);
    });

    return h.response().code(200);
  } catch (err) {
    return new Boom.conflict();
  }
};
