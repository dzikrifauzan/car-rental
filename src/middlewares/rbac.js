const { equal } = require("joi");
const AccessModel = require("../models/access");
const validation = require("./validation");
const access = new AccessModel();

 function rbac(menuParam, accessParam) {
  return async (req, res, next) => {
    const roleId = req.user.roleId;
    if (roleId === 1) next();
    
    const accessByRole = await access.getOne({
      where: {
        role_id: roleId,
        grant: {
         path: [accessParam],
         equals: true,
        },
        menu: {
          is: {
            name: menuParam,
          },
      },
    },
    });
    console.log(accessByRole);
    if (!accessByRole) return next(new ValidationError("Forbidden"));
    return next();
  };
}


module.exports = rbac