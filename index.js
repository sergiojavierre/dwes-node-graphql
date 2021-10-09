
import {gql, ApolloServer} from 'apollo-server'

import {students} from './data/students.js'

const typeDefs = gql`
    type Student{
        id: ID!
        name: String
        email: String!
        grupo: String
    }

    type Query {
        studentsCount: Int!
        allStudents: [Student]!
        findStudent(name: String): Student
    }
    
`

const resolvers  = {
    Query: {
        studentsCount: () => students.length,
        allStudents: () => students,
        findStudent: (root,args) => {
            const {name} = args
            return students.find(student => student.name === name)
        }
    },
    Student:{
        grupo: (root) => `DAW ${root.grupo}` //formar campos antes de devolver el dato
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Listening at ${url}`)
})