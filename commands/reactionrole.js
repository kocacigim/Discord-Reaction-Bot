module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        const channel = '813508476814360646';
        const OkumusRole = message.guild.roles.cache.find(role => role.name === "Okumus");
        const OkumusEmoji = '✅';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Sözleşme')
            .setDescription('Sözleşmeyi okumadan buna tıklamayın.!\n\n'
                + `${OkumusEmoji} Sözleşmeyi Okudum Kabul Ediyorum`);
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(OkumusEmoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === OkumusEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(OkumusRole);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === OkumusEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(OkumusRole);
                }
            } else {
                return;
            }
        });
    }
}