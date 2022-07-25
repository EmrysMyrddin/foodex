export const users = `
    query {
        user {
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