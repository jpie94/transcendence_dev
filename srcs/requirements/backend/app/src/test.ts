import Fastify, {FastifyRequest, FastifyReply} from 'fastify';

const fastify = Fastify({ logger: true });

export const start = async() =>{
    try{
        await fastify.listen({port:3000});
        console.log('Fastify file upload server running on http://localhost:3000');
    }
    catch(err){
        fastify.log.error(err);
        process.exit(1);
    }
}