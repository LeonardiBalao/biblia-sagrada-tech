import { Achievement } from "@prisma/client";
import prisma from "../db";

export const setAchievements = async (progress: UserProgress) => {
  let achievement: Achievement | null = null;
  // 1 - Noviço
  if (progress.chapterId === 1 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Noviço",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Noviço",
          description: "Início da jornada.",
          icon: "noviço",
        },
      });
      return achievement;
    }
    return null;
  }

  // 1 - Genêsis
  if (progress.chapterId === 52 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Criação do mundo",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Criação do mundo",
          description: "Leu sobre a criação do mundo e o início da humanidade.",
          icon: "criador",
        },
      });
      return achievement;
    }
    return null;
  }

  // 2 - Êxodo
  if (progress.chapterId === 92 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Libertador",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Libertador",
          description: "Estudou a libertação dos israelitas do Egito.",
          icon: "libertador",
        },
      });
      return achievement;
    }
    return null;
  }

  // 3 - Levítico
  if (progress.chapterId === 119 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Guardião das Leis",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Guardião das Leis",
          description: "Aprendeu sobre as leis e rituais dos israelitas.",
          icon: "guardiao",
        },
      });
      return achievement;
    }
    return null;
  }
  // 4 - Números
  if (progress.chapterId === 155 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Explorador do Deserto",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Explorador do Deserto",
          description: "Acompanhou a jornada dos israelitas pelo deserto.",
          icon: "explorador",
        },
      });
      return achievement;
    }
    return null;
  }

  // 5 - Deuteronônimio
  if (progress.chapterId === 189 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Sábio das Leis",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Sábio das Leis",
          description: "Revisou as leis e ensinamentos de Moisés.",
          icon: "sabio-das-leis",
        },
      });
      return achievement;
    }
    return null;
  }

  // 6 - Josué
  if (progress.chapterId === 213 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Conquistador",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Conquistador",
          description: "Estudou as conquistas de Josué na Terra Prometida.",
          icon: "conquistador",
        },
      });
      return achievement;
    }
    return null;
  }

  // 7 - Juízes
  if (progress.chapterId === 234 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Defensor da Justiça",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Defensor da Justiça",
          description: "Conheceu os juízes que lideraram Israel.",
          icon: "defensor",
        },
      });
      return achievement;
    }
    return null;
  }

  // 8 - Rute
  if (progress.chapterId === 238 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Fiel Companheiro",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Fiel Companheiro",
          description: "Leu sobre a lealdade e amor de Rute.",
          icon: "companheiro",
        },
      });
      return achievement;
    }
    return null;
  }

  // 9 - Samuel
  if (progress.chapterId === 293 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Ungido",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Ungido e Rei Valente",
          description: "Estudou a vida de Samuel e a unção de Saul e Davi.",
          icon: "ungido-e-rei",
        },
      });
      return achievement;
    }
    return null;
  }

  // 10 - Reis
  if (progress.chapterId === 340 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Construtor do Templo e Historiador Real",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Construtor do Templo e Historiador Real",
          description:
            "Leu sobre a construção do Templo de Salomão e os reinados e as quedas dos reis de Israel e Judá.",
          icon: "construtor-e-historiador",
        },
      });
      return achievement;
    }
    return null;
  }

  // 11 - Crônicas
  if (progress.chapterId === 405 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Cronista",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Cronista",
          description:
            "Revisou as genealogias e a história de Israel e acompanhou a história dos reis de Judá.",
          icon: "cronista",
        },
      });
      return achievement;
    }
    return null;
  }

  // 12 - Esdras
  if (progress.chapterId === 415 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Restaurador",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Restaurador",
          description:
            "Leu sobre a reconstrução do Templo e a restauração de Israel.",
          icon: "restaurador",
        },
      });
      return achievement;
    }
    return null;
  }

  // 13 - Neemias
  if (progress.chapterId === 428 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Reconstrutor",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Reconstrutor",
          description: "Estudou a reconstrução dos muros de Jerusalém.",
          icon: "reconstrutor",
        },
      });
      return achievement;
    }
    return null;
  }

  // 14 - Ester
  if (progress.chapterId === 438 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Salvador do Povo",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Salvador do Povo",
          description: "Conheceu a história de Ester e a salvação dos judeus.",
          icon: "salvador-do-povo",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Jó
  if (progress.chapterId === 480 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Paciente",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Paciente",
          description: "Aprendeu sobre a paciência e a fé de Jó.",
          icon: "paciente",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Salmos
  if (progress.chapterId === 630 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Adorador",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Adorador",
          description: "Leu os cânticos e orações de louvor a Deus.",
          icon: "adorador",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Provérbios
  if (progress.chapterId === 661 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Adorador da Sabedoria",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Adorador da Sabedoria",
          description: "Estudou os provérbios e ensinamentos de sabedoria.",
          icon: "adorador-da-sabedoria",
        },
      });
      return achievement;
    }
    return null;
  }
  // 15 - Eclesiastes
  if (progress.chapterId === 673 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Filósofo",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Filósofo",
          description: "Refletiu sobre o significado da vida e a sabedoria.",
          icon: "filosofo",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Canticos
  if (progress.chapterId === 681 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Poeta",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Poeta",
          description: "Leu os cânticos de amor e devoção.",
          icon: "poeta",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Isaias
  if (progress.chapterId === 747 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Profecias de Isaías",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Profecias de Isaías",
          description: "Estudou as profecias de Isaías sobre o Messias.",
          icon: "profecia-de-isaias",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Jeremias
  if (progress.chapterId === 799 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Lamentador",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Lamentador",
          description: "Conheceu as lamentações e profecias de Jeremias.",
          icon: "lamentador",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Lamentações de jeremias
  if (progress.chapterId === 804 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "A queda de Jerusalém",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "A queda de Jerusalém",
          description: "Leu as lamentações sobre a queda de Jerusalém.",
          icon: "a-queda-de-jerusalem",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Ezequiel
  if (progress.chapterId === 852 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Ezequiel",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Ezequiel",
          description: "Estudou as visões e profecias de Ezequiel.",
          icon: "ezequiel",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Daniel
  if (progress.chapterId === 864 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Interprete de Sonhos",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Interprete de Sonhos",
          description:
            "Conheceu as interpretações de sonhos e visões de Daniel.",
          icon: "interprete",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Oséias
  if (progress.chapterId === 878 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Mensageiro do Amor",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Mensageiro do Amor",
          description: "Leu sobre o amor incondicional de Deus por Israel.",
          icon: "mensageiro-do-amor",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Joel
  if (progress.chapterId === 881 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Arauto do Dia do Senhor",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Arauto do Dia do Senhor",
          description: "Estudou as profecias sobre o Dia do Senhor.",
          icon: "arauto",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Amós
  if (progress.chapterId === 890 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Defensor da Justiça",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Defensor da Justiça",
          description: "Conheceu as mensagens de justiça social de Amós.",
          icon: "defensor-da-justica",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Obadias
  if (progress.chapterId === 891 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Profeta da Justiça",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Profeta da Justiça",
          description:
            "Leu sobre o julgamento de Edom e a restauração de Israel.",
          icon: "profeta-da-justica",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Jonas
  if (progress.chapterId === 895 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Mensageiro da Misericórdia",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Mensageiro da Misericórdia",
          description: "Conheceu a história de Jonas e a misericórdia de Deus.",
          icon: "mensageiro-da-misericordia",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Miqueias
  if (progress.chapterId === 902 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Profeta da Justiça e Misericórdia",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Profeta da Justiça e Misericórdia",
          description:
            "Estudou as profecias de Miqueias sobre justiça e misericórdia.",
          icon: "profeta-da-justica-e-misericordia",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Naum
  if (progress.chapterId === 905 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Arauto da Queda",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Arauto da Queda",
          description: "Leu sobre a queda de Nínive nas profecias de Naum.",
          icon: "arauto-da-queda",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Habacuque
  if (progress.chapterId === 908 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Profeta da Fé",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Profeta da Fé",
          description: "Conheceu as perguntas e respostas de Habacuque a Deus.",
          icon: "profeta-da-fe",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Sofonias
  if (progress.chapterId === 911 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Arauto do Dia do Senhor",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Arauto do Dia do Senhor",
          description:
            "Estudou as profecias de Sofonias sobre o Dia do Senhor.",
          icon: "arauto-do-dia-do-senhor",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Ageu
  if (progress.chapterId === 913 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Construtor do Templo",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Construtor do Templo",
          description:
            "Leu sobre a reconstrução do templo nas profecias de Ageu.",
          icon: "construtor-do-templo",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Zacarias
  if (progress.chapterId === 927 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Profeta da Esperança",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Profeta da Esperança",
          description: "Conheceu as visões de esperança de Zacarias.",
          icon: "profeta-da-esperanca",
        },
      });
      return achievement;
    }
    return null;
  }

  // 15 - Malaquias
  if (progress.chapterId === 931 && progress.verseNumber < 4) {
    const newAchievement = await prisma.achievement.findFirst({
      where: {
        name: "Mensageiro da Aliança",
        userId: progress.userId,
      },
    });
    if (!newAchievement) {
      achievement = await prisma.achievement.create({
        data: {
          userId: progress.userId,
          name: "Mensageiro da Aliança",
          description:
            "Leu sobre a aliança de Deus com Israel nas profecias de Malaquias.",
          icon: "mensageiro-da-alianca",
        },
      });
      return achievement;
    }
    return null;
  }

  return null;
};
