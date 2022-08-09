export const users = `
    query($where: user_bool_exp) {
        user(
          order_by: {username: asc},
          where: $where
        ) {
            id
            username
            sharedBy {
              canSeeShoppingLists
              canWrite
              id
              sharedBy {
                id
                username
              }
            }
            sharingWith {
              canSeeShoppingLists
              canWrite
              id
              sharedTo {
                id
                username
              }
            }
        }
    }
`

export const user_by_pk = `
    query($id: uuid!) {
        user_by_pk(id: $id) {
            id
            username
            sharedBy {
              canSeeShoppingLists
              canWrite
              id
              sharedBy {
                id
                username
              }
            }
            sharingWith {
              canSeeShoppingLists
              canWrite
              id
              sharedTo {
                id
                username
              }
            }
          }
    }
`
