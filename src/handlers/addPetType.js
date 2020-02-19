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

  console.log('PROPERTIES HERE ', properties);
  const petType = new PetType(req.payload.name, properties);
  const petTypes = await petRepo.getPetTypeByName(petType.name, req);

  if (petTypes.length === 0) {
    await petRepo.addPetType(petType, req);
    const petTypeId = (await petRepo.getPetTypeByName(petType.name, req))[0].id;

    petType.properties.forEach(async property => {
      property.petTypeId = petTypeId;
      await petRepo.addPetProperty(property, req);
    });
  } else if (petTypes.length > 0) {
    return new Boom.conflict(
      'Pet type with that name already exists',
      petType.name
    );
  }

  return h.response().code(200);
};
