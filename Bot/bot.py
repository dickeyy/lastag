import discord
from discord.ext import commands
import random
import datetime
import mysql.connector
from dotenv import load_dotenv
import os
from discord import DMChannel

load_dotenv()

# database stuff
db = mysql.connector.connect(
    host=os.getenv("HOST"),
    user=os.getenv("USER"),
    password=os.getenv("PASSWORD"),
    database=os.getenv("DATABASE")
)
cursor = db.cursor(buffered=True)

intents = discord.Intents.default()
intents.members = True
intents.presences = True
intents.typing = True
bot = commands.Bot(command_prefix="!", intents=intents)

bot.remove_command('help')

@bot.event
async def on_ready():
    print("online")
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.playing, name="lastag.xyz"))

@bot.command()
async def help(ctx):
    mod_role = 849866763965300776
    helper_role = ctx.guild.get_role(849867183965470742)
    mod_role = ctx.guild.get_role(849866763965300776)
    tickNum = random.randint(1000,9999)
    authID = ctx.author.id

    supChan = await ctx.guild.create_text_channel(f"support-#{tickNum}")
    modChan = bot.get_channel(851257601102708746)
    
    await supChan.set_permissions(ctx.author, read_messages=True, send_messages=True)
    await supChan.set_permissions(ctx.guild.default_role, read_messages=False, send_messages=False)
    await supChan.set_permissions(helper_role, read_messages=True, send_messages=True)
    await supChan.set_permissions(mod_role, read_messages=True, send_messages=True)

    embed = discord.Embed(title=f"New Support Ticket: {tickNum}", description=f"{ctx.author} Has created a support ticket. Channel: {supChan.mention}", color=discord.Color.green())
    embed2 = discord.Embed(title=f"Support Ticket: {tickNum}", description="Please describe your problem and wait for a mod/helper to come help!", color=discord.Color.teal())

    await supChan.send(ctx.author.mention)
    await supChan.send(embed=embed2)
    await modChan.send(embed=embed)

    await ctx.message.delete(delay=None)

    cursor.execute(f"INSERT INTO `lastag_DiscSupTicks` (`userDisc_id`, `supTick_id`, `status`) VALUES ('{authID}', '{tickNum}', 'Pending')")
    db.commit()
    print('New Support Ticket In DB')

@bot.command()
async def close(ctx, tickNum):
    modChan = bot.get_channel(851257601102708746)
    delChan = discord.utils.get(ctx.guild.channels, name=f"support-{tickNum}")

    await delChan.delete()
    embed = discord.Embed(title=f"Support Ticket Closed: #{tickNum}, by {ctx.author}", color=discord.Color.red())
    await modChan.send(embed=embed)

    cursor.execute(f"SELECT userDisc_id FROM lastag_DiscSupTicks WHERE supTick_id = {tickNum}")
    userIDUF = cursor.fetchone()

    if userIDUF == None or userIDUF == ('',):
        await ctx.send("That ticket number does not exist!")
        return
    else:
        for userID in userIDUF:
            pass

    dmEmbed = discord.Embed(title="Support Ticket Closed...", description=f"Your support ticket ({tickNum}) has been closed.\n\nIf your problem was not resolved please open a new ticket!", color=discord.Color.teal())

    dmUser = bot.get_user(userID)
    await DMChannel.send(dmUser, embed=dmEmbed)

    cursor.execute(f"UPDATE lastag_DiscSupTicks SET status = 'Resolved' WHERE supTick_id = {tickNum}")
    db.commit()

    print(f"{tickNum} Resolved")



print(db)
bot.run(os.getenv("TOKEN"))