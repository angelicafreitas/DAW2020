<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">

    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            <html>
                <head>
                    <title>Arquivo Sítios</title>
                </head>
                <body>
                    <h2>Arquivo de Sítios</h2>
                    <h3>Índice </h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"></xsl:sort>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        
        <xsl:apply-templates select="//ARQELEM"/>
        
    </xsl:template>
    
    
    <!-- Templates de Índice.....................................-->
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>                
        </li>
    </xsl:template> 
    

    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title>Sítio</title>
                </head>
                <body>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>


</xsl:stylesheet>