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

  const newPetType = new PetType(req.payload.name, properties);
  const petType = await petRepo.getPetTypeByName(newPetType.name, req);

  if (petType === undefined) {
    await petRepo.addPetType(newPetType, req);
    const petTypeId = (await petRepo.getPetTypeByName(newPetType.name, req)).id;

    newPetType.properties.forEach(async property => {
      property.petTypeId = petTypeId;
      await petRepo.addPetProperty(property, req);
    });
  } else {
    return new Boom.conflict(
      'Pet type with that name already exists',
      newPetType.name
    );
  }

  return h.response().code(200);
};
